document.getElementById('searchBtn')!.addEventListener('click', async () => {
  const keywordInput = document.getElementById('keyword') as HTMLInputElement;
  const keyword = keywordInput.value.trim();
  const errorDiv = document.getElementById('error')!;
  const resultsDiv = document.getElementById('results')!;

  if (!keyword) {
    errorDiv.textContent = 'Por favor, digite uma palavra-chave.';
    return;
  }

  errorDiv.textContent = '';
  resultsDiv.innerHTML = '<p>Buscando produtos...</p>';

  try {
    const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);

    // Proteção: Verifica se a resposta não é JSON
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
      throw new Error('Erro ao buscar produtos. Verifique se o servidor backend está rodando.');
    }

    const products = await response.json();

    if (products.length === 0) {
      resultsDiv.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }

    resultsDiv.innerHTML = products.map((product: any) => `
      <div class="product">
        <a href="${product.url}" target="_blank">
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
        </a>
        ${product.rating ? `<div class="rating">${product.rating} ⭐</div>` : ''}
        ${product.reviews ? `<div class="reviews">${product.reviews} reviews</div>` : ''}
      </div>
    `).join('');

  } catch (err: any) {
    errorDiv.textContent = err.message || 'Erro desconhecido.';
    resultsDiv.innerHTML = '';
  }
});
