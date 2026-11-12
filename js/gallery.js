// change the gallery picture when the button is clicked
var galleryImage = document.getElementById("gallery-image");
var nextButton = document.getElementById("next-image-btn");

// list of pictures to cycle through
var images = [
    "../images/study1.jpg",
    "../images/study2.jpg",
    "../images/study3.jpg"
];

var currentIndex = 0;

nextButton.addEventListener("click", function () {
    currentIndex++;

    // go back to the first picture after the last one
    if (currentIndex === images.length) {
        currentIndex = 0;
    }

    galleryImage.src = images[currentIndex];
});
