import { Aluno } from "./aluno";
import { Professor } from "./professor";

export class Sala {
  id!: number;
  nome!: string;
  professor!: Professor
  alunos: Aluno[] = []
  
}
