import { TbTrowel } from 'react-icons/tb'
import { BsFillLightbulbFill } from 'react-icons/bs'
import { GiTeePipe, GiFullMetalBucket } from 'react-icons/gi'
import { AiFillFormatPainter } from 'react-icons/ai'
import { IoConstructSharp } from 'react-icons/io5'

export interface QuickSearchOption {
  imageUrl: any
  title: string
}

export const quickSearchOptions: QuickSearchOption[] = [
  {
    imageUrl: TbTrowel,
    title: 'Pedreiro',
  },
  {
    imageUrl: BsFillLightbulbFill,
    title: 'Eletricista',
  },
  {
    imageUrl: GiTeePipe,
    title: 'Encanador',
  },
  {
    imageUrl: AiFillFormatPainter,
    title: 'Pintura',
  },
  {
    imageUrl: GiFullMetalBucket,
    title: 'Gesseiro',
  },
  {
    imageUrl: IoConstructSharp,
    title: 'Manutenção',
  },
]
