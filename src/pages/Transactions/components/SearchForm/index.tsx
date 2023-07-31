import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFromInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFromInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchTransations(data: SearchFromInputs) {
    console.log(data);
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
