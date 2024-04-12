// get the data
let users = [
    {
        profilePic: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2lybHN8ZW58MHx8MHx8fDA%3D",
        displayPic: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHN8ZW58MHx8MHx8fDA%3D",
        pendingMessage: 3,
        location: "Lahore, Pakistan",
        name: "Izma",
        age: 18,
        interests: ["music", "painting"],
        bio: "I am a student at the University of Lahore. I am interested in music and painting.",
        isFriend: null
    },
    {
        profilePic: "https://images.unsplash.com/photo-1609932918173-cfd37fa4d0a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGJveXN8ZW58MHx8MHx8fDA%3D",
        displayPic: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym95c3xlbnwwfHwwfHx8MA%3D%3D",
        pendingMessage: 4,
        location: "Karachi, Pakistan",
        name: "Usman",
        age: 19,
        interests: ["music", "art"],
        bio: "I am a student at the University of Karachi. I am interested in music and art.",
        isFriend: null
    },
    {
        profilePic: "https://images.unsplash.com/photo-1556347961-f9521a88cb8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGdpcmxzfGVufDB8fDB8fHww",
        displayPic: "https://images.unsplash.com/photo-1521567097888-2c5fc40a8660?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdpcmxzfGVufDB8fDB8fHww",
        pendingMessage: 6,
        location: "Multan, Pakistan",
        name: "Avina",
        age: 30,
        interests: ["love", "painting"],
        bio: "I am a student at the University of Multan. I am interested in love and painting.",
        isFriend: null
    },
    {
        profilePic: "https://images.unsplash.com/photo-1613852348851-df1739db8201?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJveXN8ZW58MHx8MHx8fDA%3D",
        displayPic: "https://images.unsplash.com/photo-1619622376461-28732c2b88c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJveXN8ZW58MHx8MHx8fDA%3D",
        pendingMessage: 7,
        location: "Sahiwal, Pakistan",
        name: "Robin",
        age: 18,
        interests: ["sleeping", "painting"],
        bio: "I am a student at the University of Sahiwal. I am interested in music and sleeping.",
        isFriend: null
    },
];

// Function to select DOM elements
function select(elem) {
    return document.querySelector(elem);
}

let curr = 0; // 0th index

let isAniamting = false;
function setData(index) {
    // Set data for the current user
    select(".prfl-img img").src = users[index].profilePic;
    select(".badge h5").textContent = users[index].pendingMessage;
    select(".location h3").textContent = users[index].location;
    select(".name").textContent = users[index].name;
    select(".age").textContent = users[index].age;
    let clutter = "";
    users[index].interests.forEach(function (interests) {
        clutter += ` <div class="tag-1 flex gap-3 items-center bg-white/40 px-3 py-2 rounded-full">
        <i class="ri-quill-pen-fill text-sm"></i>
        <h3 class="text-sm tracking-tight capitalize ">${interests}</h3>
        </div>`;
    })
    select(".tags").innerHTML = clutter;
    select(".bio p").textContent = users[index].bio;
}

// Function to set initial data
(function setInitial() {
    select(".main-card img").src = users[curr].displayPic;
    select(".incomming-card img").src = users[curr + 1]?.displayPic;
    setData(curr);
    curr = 2;
})();

// Function to change images
function imgChange() {
    if (!isAniamting) {
        isAniamting = true;
        let tl = gsap.timeline({
            onComplete: function () {
                isAniamting = false;
                let main = select(".main-card");
                let incomming = select(".incomming-card");
                incomming.classList.remove("z-[2]");
                incomming.classList.add("z-[3]");
                incomming.classList.remove("incomming-card");

                main.classList.remove("z-[3]");
                main.classList.add("z-[2]");
                gsap.set(main, {
                    scale: 1,
                    opacity: 1
                });


                curr = (curr + 1) % users.length;
                select(".main-card img").src = users[curr].displayPic;

                main.classList.remove("main-card");
                incomming.classList.add("main-card");
                main.classList.add("incomming-card");
            }
        });

        tl.to(".main-card", {
            scale: 1.1,
            opacity: 0,
            ease: "circ",
            duration: 0.9
        }, "a")
            .from(".incomming-card", {
                scale: 0.9,
                opacity: 0,
                ease: "circ",
                duration: 1.1
            }, "a");
    }
}

// Event listener for deny button
let deny = select(".deny");
deny.addEventListener("click", function () {
    imgChange();
    setData(curr);

    gsap.from(".details .element", {
        y: "100%",
        stagger: .06,
        ease: Power4.easeInOut,
        duration: 1.5
    });
});

// Event listener for accept button
let accept = select(".accept");
accept.addEventListener("click", function () {
    imgChange();
    setData(curr);

    gsap.from(".details .element", {
        y: "100%",
        stagger: .06,
        ease: Power4.easeInOut,
        duration: 1.5
    });
});

// Function to create containers for elements
(function containerCreator() {
    document.querySelectorAll(".element")
        .forEach(function (element) {
            let box = document.createElement("div");
            box.classList.add(`${element.classList[1]}container`, 'overflow-hidden');
            box.appendChild(element);
            select(".details").appendChild(box);
        });
})();
