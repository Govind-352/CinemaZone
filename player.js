
const loadDataBtn = document.getElementById('load-data-btn');
const dataContainer = document.getElementById('data-container');
const searchInput = document.getElementById('searchInput');

loadDataBtn.addEventListener('click', async () => {
    const apiKey = 'AIzaSyBxKdnL72ZHUGoRODXVolLf4sBihuBEcEc';
    const query = searchInput.value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}`;



    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.items && data.items.length > 0) {
            const video = data.items[0];
            const videoId = video.id.videoId;
            const videoTitle = video.snippet.title;
            const videoThumbnail = video.snippet.thumbnails.high.url;
            const videoDescription = video.snippet.description;
            const videoDate = video.snippet.publishedAt;

            const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;
            const videoDetailsResponse = await fetch(videoDetailsUrl);
            const videoDetails = await videoDetailsResponse.json();
            const videoViews = videoDetails.items[0].statistics.viewCount;
            const videoLikes = videoDetails.items[0].statistics.likeCount;
            const videoDislikes = videoDetails.items[0].statistics.dislikeCount;
            const videoComments = videoDetails.items[0].statistics.commentCount;

            // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

            dataContainer.innerHTML = ''; // clear previous content
            document.querySelector(".gb-content-wrapper").appendChild(document.createElement("audio")).setAttribute("src", `https://www.youtube.com/watch?v=${videoId}`)
            // Create a new div element
            const videoContent = document.createElement('div');

            // Add a class to the div element
            videoContent.classList.add('video-details');
            dataContainer.appendChild(videoContent);


            const img = document.createElement('img');
            img.src = videoThumbnail;
            dataContainer.appendChild(img);

            // Update video title
            const videoTitleElem = document.createElement('h2');
            videoTitleElem.textContent = videoTitle;
            videoContent.appendChild(videoTitleElem);

            // Update video description
            const videoDescriptionElem = document.createElement('p');
            videoDescriptionElem.innerHTML = `<span>Description</span>: ${videoDescription}`;
            videoContent.appendChild(videoDescriptionElem);

            // Update video date
            const videoDateElem = document.createElement('p');
            videoDateElem.innerHTML = `<span>Published at</span>: ${videoDate}`;
            videoContent.appendChild(videoDateElem);

            // Update video views
            const videoViewsElem = document.createElement('p');
            videoViewsElem.innerHTML = `<span>Views</span>: ${videoViews}`;
            videoContent.appendChild(videoViewsElem);

            // Update video likes
            const videoLikesElem = document.createElement('p');
            videoLikesElem.innerHTML = `<span>Likes</span>: ${videoLikes}`;
            videoContent.appendChild(videoLikesElem);

            // Update video dislikes
            const videoDislikesElem = document.createElement('p');
            videoDislikesElem.innerHTML = `<span>Dislikes</span>: ${videoDislikes}`;
            videoContent.appendChild(videoDislikesElem);

            // Update video comments
            const videoCommentsElem = document.createElement('p');
            videoCommentsElem.innerHTML = `<span>Comments</span>: ${videoComments}`;
            videoContent.appendChild(videoCommentsElem);

            // // Add music player
            // const audio = new Audio(`https://www.youtubeinmp3.com/fetch/?video=${videoUrl}`);
            // const playBtn = document.createElement('button');
            // playBtn.textContent = 'Play';
            // const pauseBtn = document.createElement('button');
            // pauseBtn.textContent = 'Pause';

            // playBtn.addEventListener('click', () => {
            //     audio.play();
            // });

            // pauseBtn.addEventListener('click', () => {
            //     audio.pause();
            // });

            // videoContent.appendChild(playBtn);
            // videoContent.appendChild(pauseBtn);




        } else {
            dataContainer.innerHTML = 'No videos found for the given search query.';
        }
        console.log(data);
    } catch (error) {
        console.error(error);
        dataContainer.innerHTML = 'An error occurred while loading the data.';
    }
});
