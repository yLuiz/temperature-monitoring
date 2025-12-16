
import 'reflect-metadata';
import { AppDataSource } from './postgres/data-source';

async function resetDatabase() {
  try {
    console.log('⏳ Inicializando data source...');
    await AppDataSource.initialize();

    console.log('🧨 Dropando banco...');
    await AppDataSource.dropDatabase();

    console.log('📦 Subindo migrações...');
    await AppDataSource.runMigrations();

    console.log('✔ Banco resetado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao resetar o banco:', err);
    process.exit(1);
  }
}

resetDatabase();
