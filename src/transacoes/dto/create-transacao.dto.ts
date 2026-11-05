import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransacaoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  valor: number;

  @IsIn(['receita', 'despesa'])
  tipo: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;
}