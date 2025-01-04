// script.js

// 切换导航菜单
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');

if (menuToggle && navUl) { // 检查元素是否存在，避免空指针错误
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });
}

// 平滑滚动
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // 减去固定头部的高度，防止遮挡
                behavior: 'smooth'
            });

            // 关闭移动端菜单 (如果菜单是打开的)
            if (window.innerWidth <= 768 && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        }
    });
});

// 项目过滤
function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');
    if (projects.length > 0) { // 确保项目存在
        projects.forEach(project => {
            if (category === 'all' || project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
}

// lightbox 效果
const projectImages = document.querySelectorAll('#projects figure img');
const modal = document.createElement('div');
modal.id = 'modal';
document.body.appendChild(modal);

if (projectImages.length > 0) { // 确保图片存在
    projectImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
            modal.style.display = 'flex'; // 使用 flex 居中
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 表单验证
const form = document.querySelector('form');
if (form) { // 确保表单存在
    form.addEventListener('submit', (e) => {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        if (!nameInput || !emailInput || !messageInput) return; // 检查输入框是否存在

        const nameError = document.getElementById('name-error') || createErrorElement('name-error', nameInput);
        const emailError = document.getElementById('email-error') || createErrorElement('email-error', emailInput);
        const messageError = document.getElementById('message-error') || createErrorElement('message-error', messageInput);

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        if (nameInput.value.trim() === '') {
            isValid = false;
            nameError.textContent = "请输入您的姓名。";
        }

        if (emailInput.value.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            isValid = false;
            emailError.textContent = "请输入有效的电子邮件地址。";
        }

        if (messageInput.value.trim() === '') {
            isValid = false;
            messageError.textContent = "请输入您的留言。";
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    function createErrorElement(id, inputElement) {
        const errorElement = document.createElement('div');
        errorElement.id = id;
        errorElement.className = "error-message"; // 可以添加CSS样式
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        return errorElement;
    }
}