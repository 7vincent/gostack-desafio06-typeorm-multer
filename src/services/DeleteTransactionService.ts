// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import RepositoryTransaction from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const repositoryTransaction = getCustomRepository(RepositoryTransaction);
    const transaction = await repositoryTransaction.findOne(id);
    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }

    await repositoryTransaction.remove(transaction);
  }
}

export default DeleteTransactionService;
