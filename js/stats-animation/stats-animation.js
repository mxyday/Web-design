// Функція для анімації чисел з суфіксом
function animateNumbers() {
  const animatedNumbers = document.querySelectorAll('.animated-number');

  animatedNumbers.forEach(number => {
    const target = +number.getAttribute('data-target');
    const suffix = number.getAttribute('data-suffix');
    const duration = 3000; // Час анімації в мілісекундах
    const step = Math.ceil(target / (duration / 60)); // Кількість збільшень числа на кожному кроці анімації
    let current = 0;

    const updateNumber = () => {
      current += step;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      number.textContent = current + suffix; // Додати суфікс до числа
    };

    const timer = setInterval(updateNumber, 1000 / 60);
  });
}

// Виклик анімації, коли елемент з числами стає видимим
const numbersSection = document.querySelector('.numbers');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(numbersSection); // Припинити спостереження, коли елемент стає видимим
      animateNumbers(); // Запустити анімацію чисел
      numbersSection.style.opacity = '1'; // Показати секцію з числами
    }
  });
});

observer.observe(numbersSection); // Почати спостереження за секцією з числами