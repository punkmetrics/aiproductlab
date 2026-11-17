# Etapa 02: UI e UX

Define com o aluno como o produto usa a biblioteca de UI, o motion e o design system, e como o LLM mantém tudo consistente. Cada pergunta vai numa mensagem. O tema do produto nasce no showcase, que o instrutor conduz. As decisões ficam em `docs/design-system.md`.

## Antes de começar

Se `docs/design-system.md` já existe, mostre um resumo curto do que está nele e pergunte se o aluno quer revisar alguma decisão ou seguir para a demo de protótipo. Só mude o doc se ele pedir.

## Roteiro

Siga em ordem, um item por mensagem.

1. **Biblioteca de UI:**
   - Explique em até três frases o que é uma biblioteca de UI: componentes prontos, como botões, campos e menus, que o Claude reaproveita em vez de criar do zero.
   - Pergunte qual o aluno quer: shadcn, Base UI, Radix ou outra.
   - Recomendação: shadcn, que monta os componentes sobre Radix ou Base UI e combina com o Tailwind que o template já usa.
2. **Skills de motion:** pergunte quais bibliotecas de skills de motion o aluno vai usar. Esta parte tem pausa do instrutor: ele indica as bibliotecas. Não recomende nenhuma e espere o aluno trazer a indicação.
3. **Pausa do instrutor: showcase.**
   - O instrutor conduz a criação do showcase do tema ou do design system do aluno, seguindo `apps/web/app/showcase/INSTRUCOES.md`.
   - Não crie componentes nem páginas do showcase por conta própria.
   - Retome só quando o aluno avisar que o showcase está pronto.
4. **Regras de expansão:** pergunte quais são as regras para a biblioteca crescer e como elas funcionam. A pergunta é aberta. Só se o aluno travar, dê este exemplo: "todo componente novo entra primeiro no showcase".
5. **Leitura pelo LLM:** pergunte como o LLM deve ler a biblioteca e quais providers mantêm a consistência. A pergunta é aberta. Só se o aluno travar, dê este exemplo: "o Claude consulta o showcase antes de criar uma tela, e um provider de tema aplica as cores no app inteiro".
6. **Registro:** feche o doc, como descrito em "Fechamento".
7. **Demo de protótipo:** esta parte tem pausa do instrutor, que faz a demonstração primeiro.
   - Depois, ajude o aluno a prototipar a tela de uma feature do produto dele usando só os componentes do showcase.
   - Se faltar um componente, siga as regras de expansão do item 4.

## Fechamento

1. Mostre um resumo das respostas dos itens 1, 2, 4 e 5.
2. Peça a confirmação do aluno. Só escreva depois do sim.
3. Escreva `docs/design-system.md` com uma seção para cada item: "Biblioteca de UI", "Skills de motion", "Regras de expansão" e "Leitura pelo LLM e providers".
4. No fim do `CLAUDE.md`, na seção `## Decisões do projeto`, acrescente esta linha. Crie a seção se ela ainda não existir.

   ```
   Siga o design system descrito em docs/design-system.md.
   ```

5. Siga para a demo de protótipo.
