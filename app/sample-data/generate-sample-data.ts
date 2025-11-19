// app/sample-data/generate-sample-data.ts
import { 
  FurnasDataset, 
  SimaDataset, 
  BalcarDataset,
  Instituicao, 
  Reservatorio, 
  Sitio, 
  Campanha, 
  AbioticoColuna,
  SimaData,
  FluxoINPE 
} from './sample-data.types';
import * as fs from 'fs';
import * as path from 'path';

// Criar diretório de outputs
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
}

// Dados básicos compartilhados
const instituicoes: Instituicao[] = [
  { idinstituicao: 'inst_001', nome: 'INPE', sigla: 'INPE' },
  { idinstituicao: 'inst_002', nome: 'UFRJ', sigla: 'UFRJ' },
  { idinstituicao: 'inst_003', nome: 'UFJF', sigla: 'UFJF' }
];

const reservatorios: Reservatorio[] = [
  { idreservatorio: 'res_001', nome: 'Furnas', lat: -20.67, lng: -46.32 },
  { idreservatorio: 'res_002', nome: 'Mascarenhas', lat: -19.98, lng: -45.42 }
];

const sitios: Sitio[] = [
  { idsitio: 'sit_001', nome: 'Sítio Central', lat: -20.672, lng: -46.318, idreservatorio: 'res_001' },
  { idsitio: 'sit_002', nome: 'Sítio Norte', lat: -20.682, lng: -46.308, idreservatorio: 'res_001' }
];

// Gerar dados Furnas (Abióticos)
function generateFurnasData(): FurnasDataset {
  const campanhas: Campanha[] = [
    {
      idcampanha: 'camp_001',
      nrocampanha: 'CP001-2023',
      datainicio: '2023-03-15',
      datafim: '2023-03-20',
      idreservatorio: 'res_001',
      idinstituicao: 'inst_001'
    }
  ];

  const dadosAbioticos: AbioticoColuna[] = [];
  
  for (let i = 1; i <= 50; i++) {
    dadosAbioticos.push({
      idabioticocoluna: `abio_${i}`,
      idcampanha: 'camp_001',
      idsitio: i % 2 === 0 ? 'sit_002' : 'sit_001',
      datamedida: `2023-03-${15 + (i % 5)}`,
      horamedida: `${String(8 + (i % 8)).padStart(2, '0')}:${String((i * 10) % 60).padStart(2, '0')}`,
      profundidade: (i * 0.5).toFixed(1),
      dic: (10 + (i * 0.7)).toFixed(2),
      nt: (0.5 + (i * 0.1)).toFixed(3),
      pt: (0.1 + (i * 0.05)).toFixed(3),
      delta13c: (-25 - (i * 0.2)).toFixed(1),
      delta15n: (5 + (i * 0.3)).toFixed(1)
    });
  }

  return {
    instituicoes,
    reservatorios,
    sitios,
    campanhas,
    dadosAbioticos
  };
}

// Gerar dados SIMA
function generateSimaData(): SimaDataset {
  const dadosSima: SimaData[] = [];
  
  for (let i = 1; i <= 100; i++) {
    const day = String(15 + Math.floor(i / 24)).padStart(2, '0');
    const hour = String(i % 24).padStart(2, '0');
    
    dadosSima.push({
      idsima: `sima_${i}`,
      idestacao: 'est_001',
      idsensor: i % 2 === 0 ? 'sens_temp' : 'sens_ph',
      datamedicao: `2024-01-${day}`,
      horamedicao: `${hour}:00`,
      valor: i % 2 === 0 ? (20 + (i * 0.1)).toFixed(1) : (7.0 + (i * 0.01)).toFixed(2),
      unidade: i % 2 === 0 ? '°C' : 'pH',
      lat: -20.672,
      lng: -46.318
    });
  }

  return { dadosSima };
}

// Gerar dados Balcar
function generateBalcarData(): BalcarDataset {
  const fluxos: FluxoINPE[] = [];
  
  for (let i = 1; i <= 30; i++) {
    fluxos.push({
      idfluxo: `flux_${i}`,
      idcampanha: 'camp_001',
      datamedicao: `2023-04-${String(10 + (i % 20)).padStart(2, '0')}`,
      co2_flux: (100 + (i * 5)).toFixed(2),
      ch4_flux: (5 + (i * 0.3)).toFixed(2),
      temperatura: (25 + (i * 0.2)).toFixed(1)
    });
  }

  return { fluxos };
}

// Função para exportar como arquivos TypeScript
function exportAsTypeScript(data: any, filename: string, typeName: string): void {
  const content = `// Dados de amostra gerados automaticamente
import { ${typeName} } from './sample-data.types';

export const sampleData: ${typeName} = ${JSON.stringify(data, null, 2)};

export default sampleData;
`;

  fs.writeFileSync(path.join(outputsDir, filename), content, 'utf8');
}

// Executar geração
console.log('🚀 Gerando dados de amostra TypeScript...');

const furnasData = generateFurnasData();
const simaData = generateSimaData();
const balcarData = generateBalcarData();

exportAsTypeScript(furnasData, 'furnas-sample.ts', 'FurnasDataset');
exportAsTypeScript(simaData, 'sima-sample.ts', 'SimaDataset');
exportAsTypeScript(balcarData, 'balcar-sample.ts', 'BalcarDataset');

console.log('✅ Dados TypeScript gerados em: app/sample-data/outputs/');
console.log('📁 furnas-sample.ts');
console.log('📁 sima-sample.ts');
console.log('📁 balcar-sample.ts');