document.querySelectorAll('.unfinished').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('此頁面尚未完成！');
    });
});

document.querySelectorAll('.unfinished2').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('尚未設定');
    });
});