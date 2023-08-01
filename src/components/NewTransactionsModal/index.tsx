import * as Dialog from '@radix-ui/react-dialog';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewsTrasnactionsFormInputs = z.infer<typeof newTransactionsFormSchema>;

export function NewsTrasnactionsModal() {
  const createTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransactions;
    },
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<NewsTrasnactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTrasnactions(data: NewsTrasnactionsFormInputs) {
    createTransactions(data);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <Dialog.Title>Nova Transação</Dialog.Title>
          <form onSubmit={handleSubmit(handleCreateNewTrasnactions)}>
            <input
              {...register('description')}
              type="text"
              placeholder="Descrição"
              required
            />
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              placeholder="Preço"
              required
            />
            <input
              {...register('category')}
              type="text"
              placeholder="Categoria"
              required
            />

            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <TransactionTypeButton value="income" variant="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton value="outcome" variant="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                );
              }}
            />

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
}
