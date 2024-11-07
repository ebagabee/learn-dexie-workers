addEventListener('message', ({ data }) => {
  if (data.type === 'PROCESS_ITEMS') {
    // Aqui você pode adicionar qualquer processamento pesado
    const processedItems = data.items.map(item => ({
      ...item,
      // Exemplo: adiciona uma propriedade processada
      processedAt: new Date()
    }));

    postMessage({ type: 'ITEMS_PROCESSED', items: processedItems });
  }
});
