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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionsFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
});

type NewsTrasnactionsFormInputs = z.infer<typeof newTransactionsFormSchema>;

export function NewsTrasnactionsModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewsTrasnactionsFormInputs>({
    resolver: zodResolver(newTransactionsFormSchema),
  });

  function handleCreateNewTrasnactions(data: NewsTrasnactionsFormInputs) {
    console.log(data);
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

            <TransactionType>
              <TransactionTypeButton value="income" variant="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>
              <TransactionTypeButton value="outcome" variant="outcome">
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </TransactionType>

            <button type="submit" disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
}
