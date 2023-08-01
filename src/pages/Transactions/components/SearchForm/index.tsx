import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFromInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    },
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFromInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransations(data: SearchFromInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransations)}>
      <input
        {...register('query')}
        type="text"
        placeholder="Busque por transações"
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
