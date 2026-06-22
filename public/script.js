document.addEventListener('DOMContentLoaded', () => {
    const die1 = document.getElementById('die1');
    const die2 = document.getElementById('die2');
    const rollBtn = document.getElementById('rollBtn');
    const resultSum = document.getElementById('resultSum');
    const diceIndividual = document.getElementById('diceIndividual');

    let isRolling = false;

    function rollDice() {
        if (isRolling) return;
        isRolling = true;
        rollBtn.disabled = true;

        // Reset display during rolling
        resultSum.classList.remove('pop');
        resultSum.textContent = '?';
        diceIndividual.textContent = 'Rolling...';

        // Remove animation classes to reset
        die1.classList.remove('rolling-left');
        die2.classList.remove('rolling-right');

        // Force reflow to restart animations
        void die1.offsetWidth;
        void die2.offsetWidth;

        // Add 3D rotation animations
        die1.classList.add('rolling-left');
        die2.classList.add('rolling-right');

        // Rapidly shuffle the dice faces while rolling for visual effect
        let shuffleCount = 0;
        const shuffleInterval = setInterval(() => {
            const tempVal1 = Math.floor(Math.random() * 6) + 1;
            const tempVal2 = Math.floor(Math.random() * 6) + 1;
            die1.setAttribute('data-face', tempVal1);
            die2.setAttribute('data-face', tempVal2);
            shuffleCount++;

            if (shuffleCount > 10) {
                clearInterval(shuffleInterval);
            }
        }, 50);

        // After the animation finishes (600ms)
        setTimeout(() => {
            // Final roll results
            const val1 = Math.floor(Math.random() * 6) + 1;
            const val2 = Math.floor(Math.random() * 6) + 1;
            const sum = val1 + val2;

            // Update dice faces to their final values
            die1.setAttribute('data-face', val1);
            die2.setAttribute('data-face', val2);

            // Update text displays
            resultSum.textContent = sum;
            
            // Check for special combinations
            if (val1 === 1 && val2 === 1) {
                diceIndividual.innerHTML = `<strong>Snake Eyes!</strong> (1 + 1) 🐍👀`;
            } else if (val1 === val2) {
                diceIndividual.textContent = `Doubles! (${val1} + ${val2})`;
            } else {
                diceIndividual.textContent = `${val1} and ${val2}`;
            }

            // Animate sum display
            resultSum.classList.add('pop');

            // Cleanup animation classes
            die1.classList.remove('rolling-left');
            die2.classList.remove('rolling-right');

            // Re-enable roll button
            rollBtn.disabled = false;
            isRolling = false;
        }, 600);
    }

    // Event Listeners
    rollBtn.addEventListener('click', rollDice);
    die1.addEventListener('click', rollDice);
    die2.addEventListener('click', rollDice);

    // Keyboard support (Spacebar)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevent page scrolling
            rollDice();
        }
    });
});
