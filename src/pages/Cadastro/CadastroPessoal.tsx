import {
  Button,
  Label,
  Fieldset,
  Input,
  Form,
  Titulo,
  ErrorMessage,
} from '../../components';
import { useForm, Controller } from 'react-hook-form';
import InputMask from '../../components/InputMask';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const esquemaCadastro = z
  .object({
    nome: z.string().min(5, 'O nome deve ter ao menos cinco caracteres'),
    email: z
      .string()
      .min(1, 'O campo é obrigatório')
      .email('O email não é válido')
      .transform((val) => val.toLowerCase()),
    telefone: z
      .string()
      .min(1, 'O campo é obrigatório')
      .regex(/^\(\d{2,3}\) \d{5}-\d{4}$/, 'O telefone não é válido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    senhaVerificada: z.string(),
  })
  .refine((dados) => dados.senha === dados.senhaVerificada, {
    message: 'As senhas não coincidem',
    path: ['senhaVerificada'],
  });

type FormInputTipos = z.infer<typeof esquemaCadastro>;

const pegarMensagemCampoObrigatorio = (campo: string) =>
  `O campo de ${campo} é obrigatório.`;

const CadastroPessoal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInputTipos>({
    mode: 'all',
    resolver: zodResolver(esquemaCadastro),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      senha: '',
      senhaVerificada: '',
    },
  });

  const aoSubmeter = (dados: FormInputTipos) => {
    console.log(dados);
  };

  return (
    <>
      <Titulo>Insira alguns dados básicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label htmlFor='campo-nome'>Nome</Label>
          <Input
            id='campo-nome'
            placeholder='Digite seu nome completo'
            type='text'
            $error={!!errors.nome}
            {...register('nome')}
          />
          {errors.nome && <ErrorMessage>{errors.nome.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor='campo-email'>E-mail</Label>
          <Input
            id='campo-email'
            placeholder='Insira seu endereço de email'
            type='email'
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Fieldset>

        <Controller
          control={control}
          name='telefone'
          rules={{
            required: pegarMensagemCampoObrigatorio('telefone'),
            pattern: {
              value: /^\(\d{2,3}\) \d{5}-\d{4}$/,
              message: 'O telefone está inserido no formato errado',
            },
          }}
          render={({ field }) => (
            <Fieldset>
              <Label>Telefone</Label>
              <InputMask
                mask='(99) 99999-9999'
                placeholder='Ex: (DDD) XXXXX-XXXX'
                $error={!!errors.telefone}
                onChange={field.onChange}
              />
              {errors.telefone && (
                <ErrorMessage>{errors.telefone.message}</ErrorMessage>
              )}
            </Fieldset>
          )}
        />

        <Fieldset>
          <Label htmlFor='campo-senha'>Crie uma senha</Label>
          <Input
            id='campo-senha'
            placeholder='Crie uma senha'
            type='password'
            {...register('senha')}
          />
          {errors.senha && <ErrorMessage>{errors.senha.message}</ErrorMessage>}
        </Fieldset>

        <Fieldset>
          <Label htmlFor='campo-senha-confirmacao'>Repita a senha</Label>
          <Input
            id='campo-senha-confirmacao'
            placeholder='Repita a senha anterior'
            type='password'
            {...register('senhaVerificada')}
          />
          {errors.senhaVerificada && (
            <ErrorMessage>{errors.senhaVerificada.message}</ErrorMessage>
          )}
        </Fieldset>
        <Button type='submit'>Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroPessoal;
