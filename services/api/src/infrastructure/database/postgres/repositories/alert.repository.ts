import { Repository } from "typeorm";
import { CreateAlertInterface } from "../../../../application/interfaces/alert/create-alert.interface";
import { AppDataSource } from "../data-source";
import { Alert } from "../entities/Alert";

export interface FilterAlertsArgs {
  sensor_id?: string;
  type?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

class AlertRepository {
  private _alertOrmRepository: Repository<Alert>;

  constructor() {
    this._alertOrmRepository = AppDataSource.getRepository(Alert);
  }

  async getAll(args: FilterAlertsArgs): Promise<Alert[]> {
    const {
      sensor_id,
      type,
      startDate,
      endDate,
      page = 1,
      limit = 20
    } = args;

    const query = this._alertOrmRepository
      .createQueryBuilder("alert")
      .leftJoinAndSelect("alert.sensor", "sensor")
      .orderBy("alert.occurred_at", "DESC")
      .skip((page - 1) * limit)
      .take(limit);

    // filtro por sensor
    if (sensor_id) {
      query.andWhere("alert.sensor_id = :sensor_id", { sensor_id });
    }

    // filtro por tipo
    if (type) {
      query.andWhere("alert.type = :type", { type });
    }

    // filtro por intervalo de datas
    if (startDate && endDate) {
      query.andWhere(
        "alert.occurred_at BETWEEN :startDate AND :endDate",
        { startDate, endDate }
      );
    }
    else if (startDate) {
      query.andWhere(
        "alert.occurred_at >= :startDate",
        { startDate }
      );
    }
    else if (endDate) {
      query.andWhere(
        "alert.occurred_at <= :endDate",
        { endDate }
      );
    }

    return query.getMany();
  }

  async getById(id: string): Promise<Alert | null> {
    return this._alertOrmRepository.findOne({
      where: { id },
      relations: ["sensor"]
    });
  }

  async getBySensorId(
    sensor_id: string,
    limit = 50
  ): Promise<Alert[]> {
    return this._alertOrmRepository.find({
      where: { sensor_id },
      order: { occurred_at: "DESC" },
      take: limit
    });
  }

  async getLatest(limit = 20): Promise<Alert[]> {
    return this._alertOrmRepository.find({
      order: { occurred_at: "DESC" },
      take: limit,
      relations: ["sensor"]
    });
  }

  async create(alertData: CreateAlertInterface): Promise<Alert> {
    const alert = this._alertOrmRepository.create(alertData);
    return this._alertOrmRepository.save(alert);
  }

  async deleteOlderThan(date: Date): Promise<number> {
    const result = await this._alertOrmRepository
      .createQueryBuilder()
      .delete()
      .from(Alert)
      .where("occurred_at < :date", { date })
      .execute();

    return result.affected ?? 0;
  }

  async count(args: FilterAlertsArgs): Promise<number> {
    const {
      sensor_id,
      type,
      startDate,
      endDate
    } = args;

    const query = this._alertOrmRepository
      .createQueryBuilder("alert");

    if (sensor_id) {
      query.andWhere("alert.sensor_id = :sensor_id", { sensor_id });
    }

    if (type) {
      query.andWhere("alert.type = :type", { type });
    }

    if (startDate && endDate) {
      query.andWhere(
        "alert.occurred_at BETWEEN :startDate AND :endDate",
        { startDate, endDate }
      );
    } else if (startDate) {
      query.andWhere(
        "alert.occurred_at >= :startDate",
        { startDate }
      );
    } else if (endDate) {
      query.andWhere(
        "alert.occurred_at <= :endDate",
        { endDate }
      );
    }

    return query.getCount();
  }
}

export const AlertRepositoryInstance = new AlertRepository();
export type AlertRepositoryType = AlertRepository;
