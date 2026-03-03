/**
 * Скрипт для сайта модификации like Max (Dark/Glass/Paper.js)
 */

const downloadLink = "https://github.com/infikot/like-max/releases";

// --- Захардкоженный текст правил ---
const rulesHTML = `
    <h3>Об авторе и канале</h3>
    <p>Я — <a href="https://t.me/infikot" target="_blank">@infikot</a>, автор и разработчик модификаций, представленных в этой группе ☎️</p>
    <p>В этой группе (в её ветках) публикуются сами неофициальные версии приложений и информация о них, в том числе с измененным функционалом.</p>

    <h3>ВАЖНАЯ ИНФОРМАЦИЯ К ПРОЧТЕНИЮ (Отказ от ответственности)</h3>
    <p><strong>Внимание:</strong> Использование любых неофициальных версий, модификаций или патчей программного обеспечения (далее — Модификации) может нарушать условия Пользовательских соглашений и политики конфиденциальности правообладателей оригинальных приложений.</p>
    <p><strong>Правовой статус:</strong> Модификации, представленные в этом канале, являются неофициальными. Автор канала не претендует на авторские права издателей и не использует продукт для монетизации.</p>
    <p><strong>Риски для пользователя:</strong> Использование Модификаций осуществляется на ваш личный страх и риск. Правообладатель приложения (издатель) имеет право в одностороннем порядке:</p>
    <ul>
        <li>Приостановить или прекратить доступ к Сервису (включая блокировку аккаунта).</li>
        <li>Ограничить функциональность приложения.</li>
    </ul>
    <p><strong>Безопасность и конфиденциальность:</strong> Автор канала не гарантирует отсутствие вредоносного кода, ошибок или других нежелательных последствий. Автор не собирает и не использует персональные данные пользователей через эти Модификации.</p>
    <p><strong>Ответственность:</strong> Автор канала не несет ответственности за любые последствия, убытки или ущерб, связанные с использованием Модификаций.</p>
    <p>Перед использованием любой Модификации, представленной в этом канале, пользователь обязан самостоятельно ознакомиться с оригинальными документами правообладателя. Подробные условия, применимые к конкретной модификации (например, для Max или TikTok), находятся в закрепленном сообщении соответствующей ветки.</p>

    <h3>Обратная связь</h3>
    <p>По вопросам, связанным с предложениями, багами и контентом канала, обращайтесь ко мне в личные сообщения — <a href="https://t.me/infikot" target="_blank">@infikot</a></p>
    <p>Для досудебного урегулирования претензий вы можете обратиться в личные сообщения или использовать адрес электронной почты: <a href="mailto:danilaexdanila@gmail.com">danilaexdanila@gmail.com</a></p>
`;

let ppPsHTML = '<p>Загрузка...</p>';

// --- Блок предупреждения об актуальности ---
function getActualityNote(url, label) {
    return `
        <div class="actuality-warning">
            <div class="actuality-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            </div>
            <p class="actuality-text">Данные на этой странице могут быть неактуальными. Советую проверить актуальную информацию здесь:</p>
            <a href="${url}" target="_blank" class="actuality-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                ${label}
            </a>
        </div>
    `;
}

// --- Модалка ---
function openModal(type) {
    const modal = document.getElementById('universalModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const actions = document.getElementById('modalActions');

    if (type === 'rules') {
        title.textContent = 'Правила и ответственность';
        body.innerHTML = rulesHTML + getActualityNote('https://t.me/infikot_dev/22', 'Актуальная версия в Telegram');
        actions.innerHTML = '<button class="btn btn-primary" onclick="closeModal()">Закрыть</button>';
    } else if (type === 'agreement') {
        title.textContent = 'Доп. соглашение';
        body.innerHTML = ppPsHTML + getActualityNote('https://t.me/infikot_dev/22/40', 'Актуальная версия в Telegram');
        actions.innerHTML = '<button class="btn btn-primary" onclick="closeModal()">Закрыть</button>';
    } else if (type === 'download') {
        title.textContent = 'Соглашение';
        body.innerHTML = ppPsHTML + getActualityNote('https://t.me/infikot_dev/22/40', 'Актуальная версия в Telegram');
        actions.innerHTML = `
            <button class="btn btn-secondary" onclick="closeModal()">Отклонить</button>
            <button class="btn btn-primary" onclick="acceptAndDownload()">Принять и скачать</button>
        `;
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    body.scrollTop = 0;
}

function closeModal() {
    const modal = document.getElementById('universalModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function acceptAndDownload() {
    window.open(downloadLink, '_blank');
    closeModal();
}

// --- Paper.js Анимация фона ---
function initPaperJS() {
    paper.setup(document.getElementById('bgCanvas'));
    
    const points = [];
    const pointsCount = window.innerWidth < 600 ? 30 : 60;
    const maxDistance = 120;
    
    for (let i = 0; i < pointsCount; i++) {
        let point = new paper.Point(
            paper.Point.random().x * paper.view.size.width,
            paper.Point.random().y * paper.view.size.height
        );
        let path = new paper.Path.Circle(point, window.innerWidth < 600 ? 1 : 1.5);
        path.fillColor = 'rgba(255, 255, 255, 0.5)';
        
        points.push({
            path: path,
            vector: new paper.Point({
                angle: Math.random() * 360,
                length: (Math.random() * 0.5) + 0.1
            })
        });
    }
    
    let connections = new paper.Group();
    
    paper.view.onFrame = function(event) {
        connections.removeChildren();
        
        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            p.path.position = p.path.position.add(p.vector);
            
            if (p.path.position.x < 0 || p.path.position.x > paper.view.size.width) p.vector.x *= -1;
            if (p.path.position.y < 0 || p.path.position.y > paper.view.size.height) p.vector.y *= -1;
            
            for (let j = i + 1; j < points.length; j++) {
                let p2 = points[j];
                let distance = p.path.position.getDistance(p2.path.position);
                
                if (distance < maxDistance) {
                    let line = new paper.Path.Line(p.path.position, p2.path.position);
                    let opacity = (1 - (distance / maxDistance)) * 0.15;
                    line.strokeColor = `rgba(255, 255, 255, ${opacity})`;
                    line.strokeWidth = 1;
                    connections.addChild(line);
                }
            }
        }
    };
}

// --- Анимация иконки при скролле (капля вверх) ---
function initLogoScrollEffect() {
    const logo = document.getElementById('logo');
    if (!logo) return;

    const triggerStart = 0;
    const triggerEnd = 300;
    let ticking = false;

    function updateLogo() {
        const scrollY = window.scrollY || window.pageYOffset;
        const progress = Math.min(Math.max((scrollY - triggerStart) / (triggerEnd - triggerStart), 0), 1);

        const translateY = -80 * progress;
        const opacity = 1 - progress;
        const scaleX = 1 - 0.4 * progress;
        const scaleY = 1 + 0.2 * progress;
        const borderRadius = 48 + 52 * progress;
        const borderRadiusBottom = 48 - 20 * progress;

        logo.style.transform = `translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
        logo.style.opacity = opacity;
        logo.style.borderRadius = `${borderRadius}px ${borderRadius}px ${borderRadiusBottom}px ${borderRadiusBottom}px`;

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateLogo);
            ticking = true;
        }
    }, { passive: true });

    updateLogo();
}

// --- Загрузка конфигов ---
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        
        document.getElementById('modVersion').textContent = config.modVersion;
        document.getElementById('originalVersion').textContent = config.originalVersion;
        document.getElementById('androidVersion').textContent = config.androidVersion;
        
        const clList = document.getElementById('changelogList');
        if (config.changelog) {
            clList.innerHTML = config.changelog.map(item => `<li>${item}</li>`).join('');
        }
        
        const fList = document.getElementById('featuresList');
        if (config.features) {
            fList.innerHTML = config.features.map(item => `<li>${item}</li>`).join('');
        }
    } catch (e) {
        console.error('Ошибка config.json:', e);
    }
}

async function loadAgreement() {
    try {
        const response = await fetch('pp_ps.json');
        const data = await response.json();
        let html = '';
        
        for (const [key, value] of Object.entries(data)) {
            if (key.startsWith('title_')) {
                html += `<h3>${value}</h3>`;
            } else if (key.startsWith('text_')) {
                html += `<p>${value}</p>`;
            } else if (key.startsWith('list_')) {
                html += `<ul>${value.map(i => `<li>${i}</li>`).join('')}</ul>`;
            } else if (key === 'links') {
                html += `<h3>Официальные документы:</h3><ul>${value.map(l => `<li><a href="${l.url}" target="_blank">${l.text}</a></li>`).join('')}</ul>`;
            }
        }
        
        ppPsHTML = html;
    } catch (e) {
        console.error('Ошибка pp_ps.json:', e);
        ppPsHTML = '<p>Ошибка загрузки соглашения.</p>';
    }
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
    initPaperJS();
    initLogoScrollEffect();
    loadConfig();
    loadAgreement();
    
    document.getElementById('downloadBtn').onclick = () => openModal('download');
    
    window.onclick = (e) => {
        if (e.target === document.getElementById('universalModal')) closeModal();
    };
});