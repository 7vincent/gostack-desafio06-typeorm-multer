import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Categoty from '../models/Category';

import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const repositoryTransation = getCustomRepository(TransactionRepository);
    const repositoryCategory = getRepository(Categoty);

    const { total } = await repositoryTransation.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance');
    }

    let categoryExist = await repositoryCategory.findOne({
      where: {
        title: category,
      },
    });

    if (!categoryExist) {
      categoryExist = repositoryCategory.create({
        title: category,
      });
      await repositoryCategory.save(categoryExist);
    }

    const createTransation = repositoryTransation.create({
      title,
      value,
      type,
      category: categoryExist,
    });
    await repositoryTransation.save(createTransation);
    return createTransation;
  }
}

export default CreateTransactionService;
