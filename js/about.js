document.addEventListener('DOMContentLoaded', () => {
  const h2Spans = document.querySelectorAll('h2 span');

  // h2 出場動畫：快速但不失節奏感
  gsap.fromTo(
    h2Spans,
    {
      opacity: 0,
      y: 10,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4, // 每個 span 動畫時間短一點
      stagger: 0.06, // 每個間隔更短，讓整體快一點完成
      ease: 'power2.out',
      onComplete: animateSentences,
    }
  );

  function animateSentences() {
    const pEls = document.querySelectorAll('.intro-txt p');

    pEls.forEach(pEl => {
      const rawHTML = pEl.innerHTML;

      const sentences = rawHTML
        .split(/(?<=[，。；——！])|<br\s*\/?>|<br><br>/g)
        .filter(Boolean);

      pEl.innerHTML = sentences
        .map(sentence => {
          if (sentence.includes('<br')) return sentence;
          return `<span class="sentence">${sentence.trim()}</span>`;
        })
        .join('');
    });

    // p 動畫（立刻接上，保持滑入感）
    gsap.fromTo(
      '.sentence',
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15, // 比 h2 略慢，提升段落感
        ease: 'power2.out',
      }
    );
  }
});
