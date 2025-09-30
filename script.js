// Afficher la vidéo du projet vétérinaire
function showVideo() {
    const video = document.getElementById('vet-video');
    video.style.display = video.style.display === 'none' ? 'block' : 'none';
}

// Afficher les images du projet PharmaInsight
function showImages() {
    const imagesDiv = document.getElementById('pharma-images');
    imagesDiv.style.display = imagesDiv.style.display === 'none' ? 'block' : 'none';
}