import { ReactNode, createContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface CreateTrasnactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransactions: (data: CreateTrasnactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType,
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    });
    setTransactions(response.data);
  }

  async function createTransactions(data: CreateTrasnactionInput) {
    const { description, price, type, category } = data;
    const response = await api.post('/transactions', {
      description,
      price,
      type,
      category,
      createdAt: new Date(),
    });
    setTransactions((state) => [...state, response.data]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
