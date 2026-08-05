/**
 * Saudação pelo horário local.
 *
 * O Modo cumprimenta uma vez, por extenso, e não repete o nome em nenhum outro
 * lugar da tela: é o único momento em que o produto fala na primeira pessoa.
 */
export function greetingFor(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}
