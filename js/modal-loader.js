// modal-loader.js (v-final - Online Page Loader)

document.addEventListener('DOMContentLoaded', () => {

    const contactPageUrl = 'https://3yuedaohang.com/contact-modal'; // 在这里设置您的联系页面URL
    let modalOverlay = null;

    // 动态创建弹窗所需的CSS样式
    function createModalStyles() {
        if (document.getElementById('iframe-modal-styles')) return;

        const styles = `
            .iframe-modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(10, 10, 12, 0.7);
                backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
                z-index: 99999;
                display: flex; justify-content: center; align-items: center;
                opacity: 0; visibility: hidden;
                transition: opacity 0.4s ease, visibility 0s 0.4s;
            }
            .iframe-modal-overlay.active {
                opacity: 1; visibility: visible;
            }
            .iframe-modal-container {
                position: relative;
                width: 90%;
                height: 90%;
                max-width: 960px; /* 弹窗最大宽度 */
                max-height: 720px; /* 弹窗最大高度 */
                transform: scale(0.95);
                opacity: 0;
                transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease;
            }
            .iframe-modal-overlay.active .iframe-modal-container {
                transform: scale(1);
                opacity: 1;
            }
            .iframe-modal-content {
                width: 100%;
                height: 100%;
                border: none;
                background-color: #121214; /* iframe加载时的背景色 */
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            }
            .iframe-modal-close-btn {
                position: absolute;
                top: -15px; right: -15px;
                width: 36px; height: 36px;
                background-color: #18181B;
                color: #A1A1AA;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: 1;
                transition: all 0.3s ease;
                z-index: 10;
            }
            .iframe-modal-close-btn:hover {
                transform: rotate(90deg) scale(1.1);
                color: white;
                background-color: #27272A;
            }
            @media (max-width: 768px) {
                .iframe-modal-container { width: 95%; height: 85%; }
                .iframe-modal-close-btn { top: 0px; right: 0px; }
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.id = 'iframe-modal-styles';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    // 创建弹窗的DOM结构
    function createModalDOM() {
        if (document.getElementById('iframeContactModal')) return;

        modalOverlay = document.createElement('div');
        modalOverlay.className = 'iframe-modal-overlay';
        modalOverlay.id = 'iframeContactModal';

        const modalContainer = document.createElement('div');
        modalContainer.className = 'iframe-modal-container';
        
        const iframe = document.createElement('iframe');
        iframe.className = 'iframe-modal-content';
        iframe.src = 'about:blank'; // 初始为空白，点击时才加载，优化性能

        const closeBtn = document.createElement('button');
        closeBtn.className = 'iframe-modal-close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', '关闭');

        modalContainer.appendChild(iframe);
        modalContainer.appendChild(closeBtn);
        modalOverlay.appendChild(modalContainer);
        document.body.appendChild(modalOverlay);

        // 绑定关闭事件
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // 打开弹窗的函数
    function openModal(e) {
        e.preventDefault();
        
        // 确保弹窗DOM和样式只创建一次
        if (!modalOverlay) {
            createModalStyles();
            createModalDOM();
        }
        
        const iframe = modalOverlay.querySelector('iframe');
        // 只有当 iframe 没有加载内容时才设置 src，避免重复加载
        if (iframe.src === 'about:blank') {
            iframe.src = contactPageUrl;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
    }

    // 关闭弹窗的函数
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    }

    // 找到页面上所有需要触发弹窗的按钮
    const contactTriggers = document.querySelectorAll('.contact-trigger');
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', openModal);
    });

    // 允许通过 'Escape' 键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});