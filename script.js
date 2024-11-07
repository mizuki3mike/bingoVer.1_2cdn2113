document.addEventListener('DOMContentLoaded', () => {
    const bingoCard = document.getElementById('bingo-card');
    const reachCountElement = document.getElementById('reach-count');
    const numbers = generateBingoNumbers();
    createBingoCard(bingoCard, numbers);

    bingoCard.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            event.target.classList.toggle('selected');
            checkBingo(bingoCard, reachCountElement);
        }
    });
});

function generateBingoNumbers() {
    const numbers = [];
    while (numbers.length < 25) {
        const num = Math.floor(Math.random() * 75) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

function createBingoCard(container, numbers) {
    numbers.forEach(number => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = number;
        container.appendChild(cell);
    });
}

function checkBingo(container, reachCountElement) {
    const cells = Array.from(container.children);
    const selectedCells = cells.filter(cell => cell.classList.contains('selected'));
    const selectedIndices = selectedCells.map(cell => cells.indexOf(cell));
    const bingoPatterns = getBingoPatterns();
    let reachCount = 0;
    let bingo = false;

    bingoPatterns.forEach(pattern => {
        const matchCount = pattern.filter(index => selectedIndices.includes(index)).length;
        if (matchCount === 5) {
            bingo = true;
        } else if (matchCount === 4) {
            reachCount++;
        }
    });

    reachCountElement.textContent = `リーチ数: ${reachCount}`;

    if (bingo) {
        alert('ビンゴです！');
    }
}

function getBingoPatterns() {
    const patterns = [];

    // Rows
    for (let i = 0; i < 5; i++) {
        patterns.push([i * 5, i * 5 + 1, i * 5 + 2, i * 5 + 3, i * 5 + 4]);
    }

    // Columns
    for (let i = 0; i < 5; i++) {
        patterns.push([i, i + 5, i + 10, i + 15, i + 20]);
    }

    // Diagonals
    patterns.push([0, 6, 12, 18, 24]);
    patterns.push([4, 8, 12, 16, 20]);

    return patterns;
}
