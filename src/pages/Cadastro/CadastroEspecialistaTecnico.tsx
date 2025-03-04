import { useFieldArray, useForm } from 'react-hook-form';
import {
  Button,
  ButtonContainer,
  Divisor,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from '../../components';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const esquemaCadastroEspecialista = z.object({
  crm: z.string().min(1, 'O campo é obrigatório'),
  especialidades: z.array(
    z.object({
      especialidade: z.string().min(1, 'O campo é obrigatório'),
      anoConclusao: z.coerce
        .number({
          errorMap: () => ({ message: 'Insira um número' }),
        })
        .min(1, 'O campo é obrigatório'),
      instituicao: z.string().min(1, 'O campo é obrigatório'),
    })
  ),
});

type FormEspecialista = z.infer<typeof esquemaCadastroEspecialista>;

const CadastroEspecialistaTecnico = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormEspecialista>({
    resolver: zodResolver(esquemaCadastroEspecialista),
    mode: 'all',
    defaultValues: {
      crm: '',
    },
  });
  const { fields, append } = useFieldArray({ control, name: 'especialidades' });

  const adicionarNovaEspecialidade = () => {
    append({
      especialidade: '',
      anoConclusao: 0,
      instituicao: '',
    });
  };

  const aoSubmeter = (dados: FormEspecialista) => {
    console.log(dados);
  };
  return (
    <>
      <Titulo className='titulo'>Agora, seus dados técnicos:</Titulo>
      <Form onSubmit={handleSubmit(aoSubmeter)}>
        <Fieldset>
          <Label>CRM</Label>
          <Input
            id='campo-crm'
            type='text'
            placeholder='Insira seu número de registro'
            $error={!!errors.crm}
          />
          {errors.crm && <ErrorMessage>{errors.crm.message}</ErrorMessage>}
        </Fieldset>
        <Divisor />
        {fields.map((field, index) => (
          <div key={field.id}>
            <Fieldset>
              <Label>Especialidade</Label>
              <Input
                id='campo-especialidade'
                type='text'
                placeholder='Qual sua especialidade?'
                {...register(`especialidades.${index}.especialidade`)}
                $error={!!errors.especialidades?.[index]?.especialidade}
              />
              {errors.especialidades?.[index]?.especialidade && (
                <ErrorMessage>
                  {errors.especialidades?.[index]?.especialidade?.message}
                </ErrorMessage>
              )}
            </Fieldset>

            <FormContainer>
              <Fieldset>
                <Label>Ano de conclusão</Label>
                <Input
                  id='campo-ano-conclusao'
                  type='text'
                  placeholder='2005'
                  {...register(`especialidades.${index}.anoConclusao`)}
                  $error={!!errors.especialidades?.[index]?.anoConclusao}
                />
                {errors.especialidades?.[index]?.anoConclusao && (
                  <ErrorMessage>
                    {errors.especialidades?.[index]?.anoConclusao?.message}
                  </ErrorMessage>
                )}
              </Fieldset>
              <Fieldset>
                <Label>Instituição de ensino</Label>
                <Input
                  id='campo-instituicao-ensino'
                  type='text'
                  placeholder='USP'
                  {...register(`especialidades.${index}.instituicao`)}
                  $error={!!errors.especialidades?.[index]?.instituicao}
                />
                {errors.especialidades?.[index]?.instituicao && (
                  <ErrorMessage>
                    {errors.especialidades?.[index]?.instituicao?.message}
                  </ErrorMessage>
                )}
              </Fieldset>
            </FormContainer>
          </div>
        ))}
        <Divisor />
        <ButtonContainer>
          <Button
            type='button'
            $variante='secundario'
            onClick={adicionarNovaEspecialidade}
          >
            Adicionar Especialidade
          </Button>
        </ButtonContainer>
        <Button type='submit'>Avançar</Button>
      </Form>
    </>
  );
};

export default CadastroEspecialistaTecnico;
