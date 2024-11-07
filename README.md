# Entendendo o Sistema Angular com Signals, Dexie e Web Workers

1. Estrutura básica e Fluxo de Dados

O sistema funciona seguindo este fluxo:

1. O Usuário digita dados no formulário (Form Component)
2. Dados são enviados para o botão de salvar (FooterActionComponent)
3. Ao clicar em salvar, os dados vão para o DataService
4. DataService salva no banco IndexedDB usando Dexie
5. Worker processa os dados em background
6. Interface é atualziada com os novos dados

# 2. Componentes e suas Responsabilidades

2.1 FormComponent

```ts
export class FormComponent {
  name = signal("");
  description = signal("");
  itemModel = model<Item | null>(null);
}
```

**O que são Signals?**

- Signals são a nova forma de gerenciar estado no Angular
- São como variáveis reativas que notificam quando mudam
- Exemplo: `name = signal("")` cria uma variável reativa vazia
- Para ler o valor: `name()`
- Para alterar: `name.set('novo valor')`

**Por que usar Signals?**

- Melhor performance que Observables
- Sintaxe mais simples
- Atualizações automáticas na interface
- Integração nativa com o Angular
