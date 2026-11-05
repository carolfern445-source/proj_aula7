import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';
import { CreateTransacaoDto } from './dto/create-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async create(dto: CreateTransacaoDto) {
    return this.transacaoModel.create(dto);
  }

  async findAll() {
    const historico = await this.transacaoModel.find().exec();

    const totalReceitas = historico
      .filter((t) => t.tipo === 'receita')
      .reduce((soma, t) => soma + t.valor, 0);

    const totalDespesas = historico
      .filter((t) => t.tipo === 'despesa')
      .reduce((soma, t) => soma + t.valor, 0);

    const totalGastoImpulso = historico
      .filter((t) => t.tipo === 'despesa' && t.consumoConsciente === false)
      .reduce((soma, t) => soma + t.valor, 0);

    return {
      historico,
      metricas: {
        saldoTotal: totalReceitas - totalDespesas,
        totalDespesas,
        totalGastoImpulso,
      },
    };
  }
}