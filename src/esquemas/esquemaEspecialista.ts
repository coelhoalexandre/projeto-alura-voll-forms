import { z } from 'zod';

export const esquemaCadastroEnderecoEspecialista = z.object({
  avatar: z.instanceof(FileList).transform((lista) => lista.item(0)!),
  endereco: z.object({
    cep: z.string().min(8, 'Informe um CEP válido'),
    rua: z.string().min(1, 'Informe uma rua válida'),
    numero: z.coerce.number().min(1, 'Informe um número válido'),
    bairro: z.string().min(1, 'Informe um bairro válido'),
    localidade: z.string().min(1, 'Informe uma localidade válido'),
  }),
});
