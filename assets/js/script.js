/* SEARCH -----------------------------------------------------------  */
let searchInput = document.querySelector('.search-input');
let searchButton = document.querySelector('.search-button');
let searchName = '';
let dataAno = '';
let image = document.querySelector('.imagem-git img');
let userName = document.querySelector('.username');
let joinGitHub = document.querySelector('.joingithub');
let loginGitHub = document.querySelector('#name-github');
let infosUserText = document.querySelector('#infos-user-text');
let repositiorios = document.querySelector('.repositorios');
let followers = document.querySelector('.followers');
let following = document.querySelector('.following');
let localization = document.querySelector('.localization');
let twitter = document.querySelector('.twitteruser');
let blog = document.querySelector('.linkblog');
let urlGitHub = document.querySelector('.urlgithub');
let preencherResultado = document.querySelector('.infos-user-section');
let searchErrorMessage = document.querySelector('.box-container header .search-header p');
let statusGitHub = document.querySelector('.status-github');


searchInput.addEventListener('change', (event) => {
    searchName = event.target.value;
});

searchButton.addEventListener('click', async () => {
    searchName.trim();

    if(searchName !== ''){
        try{
            let req = await fetch(`https://api.github.com/users/${searchName}`);
            let json = await req.json();
            dados(json);

            searchErrorMessage.style.display = 'none';
            searchInput.style.border = '0px';
            searchInput.value = '';
        }catch(error){
            preencherResultado.style.display = 'none';
            searchErrorMessage.style.display = 'block';
            searchInput.style.border = '1px solid red';
            searchInput.value = '';
        };
    }else{
        alert('Digite algum nome.');
    };
});

const dados = (user) => {
    let join = user.created_at.slice(0, 10).split('-').reverse();
    preencherResultado.style.display = 'none';

    data(join[1]);
    limpaDados();

    if(user){
        image.src = `${user.avatar_url}`;
        userName.innerHTML = `${user.name}`;
        joinGitHub.innerHTML = `Joined ${join[0]} ${dataAno} ${join[2]}`;
        loginGitHub.removeAttribute('href');
        loginGitHub.innerHTML = `@${user.login}`;
        loginGitHub.setAttribute('href', `${user.html_url}`);

        infosUserText.innerHTML = `${user.bio}`;
        repositiorios.innerHTML = `${user.public_repos}`;
        followers.innerHTML = `${user.followers}`;
        following.innerHTML = `${user.following}`;
        localization.innerHTML = `${user.location}`;

        twitter.removeAttribute('href');
        twitter.innerHTML = `${user.twitter_username}`;
        user.twitter_username !== null ? twitter.setAttribute('href', `https://twitter.com/${user.twitter_username}`) : null;

        blog.removeAttribute('href');
        user.blog.indexOf('https://') !== -1 ? blog.innerHTML = `${user.blog.slice(8)}` : blog.innerHTML = `${user.blog}`;
        user.blog.indexOf('https://') !== -1 ? blog.setAttribute('href', `${user.blog}`) : blog.setAttribute('href', `https://${user.blog}`);
        blog.getAttribute('href') === 'https://' ? blog.removeAttribute('href') : blog;
        urlGitHub.innerHTML = `@${user.company}`;

        checkUsers(user);
        preencherResultado.style.display = 'block';
    };
};

const limpaDados = () => {
    userName.innerHTML = 'Not Available';
    joinGitHub.innerHTML = 'Not Available';
    loginGitHub.innerHTML = 'Not Available';
    infosUserText.innerHTML = 'Not Available';
    repositiorios.innerHTML = '';
    followers.innerHTML = '';
    following.innerHTML = '';
    localization.innerHTML = 'Not Available';
    twitter.innerHTML = 'Not Available';
    blog.innerHTML = 'Not Available';
    urlGitHub.innerHTML = 'Not Available';
};

const checkUsers = (listaUser) => {
    listaUser.name === null ? userName.innerHTML = 'Not Available' : listaUser.name;
    listaUser.bio === null ? infosUserText.innerHTML = '' : listaUser.bio;
    listaUser.location === null ? localization.innerHTML = 'Not Available' : listaUser.location;
    listaUser.twitter_username === null ? twitter.innerHTML = 'Not Available' : listaUser.twitter_username;
    listaUser.blog === '' ? blog.innerHTML = 'Not Available' : listaUser.blog;
    listaUser.company === null ? urlGitHub.innerHTML = 'Not Available' : listaUser.company;
};

const data = (numero) => {
    numero === '01' ? dataAno = 'Jan' : numero;
    numero === '02' ? dataAno = 'Fev' : numero;
    numero === '03' ? dataAno = 'Mar' : numero;
    numero === '04' ? dataAno = 'Abr' : numero;
    numero === '05' ? dataAno = 'Mai' : numero;
    numero === '06' ? dataAno = 'Jun' : numero;
    numero === '07' ? dataAno = 'Jul' : numero;
    numero === '08' ? dataAno = 'Ago' : numero;
    numero === '09' ? dataAno = 'Set' : numero;
    numero === '10' ? dataAno = 'Out' : numero;
    numero === '11' ? dataAno = 'Nov' : numero;
    numero === '12' ? dataAno = 'Dez' : numero;
};

/* MODE -------------------------------------------------------------  */

let colorsBlack = ['#0079FF', '#1E2A47', '#141D2F', '#FFFFFF'];
let colorsWhite = ['#FEFEFE', '#F6F8FF', '#0079FF', '#697C9A', '#4B6A9B', '#2B3442'];

document.querySelector('.lightdark').addEventListener('click', (event)=> {
    if(event.target.innerText === 'LIGHT'){
        event.target.innerHTML = `
            DARK
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        `;

        document.body.style = `background-color: ${colorsWhite[1]}; color: ${colorsWhite[5]};`;
        searchInput.style = `background-color: ${colorsWhite[0]}; box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.20); color: ${colorsWhite[4]};`;
        preencherResultado.style = `background-color: ${colorsWhite[0]}; box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.20); color: ${colorsWhite[3]}; display: block;`;
        userName.style = `color: ${colorsWhite[5]};`;
        joinGitHub.style = `color: ${colorsWhite[3]};`;
        statusGitHub.style = `background-color: ${colorsWhite[1]};`;
        infosUserText.style = `color: ${colorsWhite[4]};`;
        document.querySelectorAll('.status-github ul li p').forEach(item => item.style = `color: ${colorsWhite[4]};`);
        document.querySelectorAll('.status-github ul li h4').forEach(item => item.style = `color: ${colorsWhite[5]};`);
        document.querySelectorAll('.menu-nav div a').forEach(item => item.style = `color: ${colorsWhite[4]};`);
        document.querySelectorAll('.menu-nav div p').forEach(item => item.style = `color: ${colorsWhite[4]};`);
        document.querySelector('section .infos-section .imagem-git').style = `background-color: rgba(36, 34, 34, 0.137);`;

    }else if(event.target.innerText === 'DARK'){
        event.target.innerHTML = `
            LIGHT
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        `;

        document.body.style = `background-color: ${colorsBlack[2]}; color: ${colorsBlack[3]};`;
        searchInput.style = `background-color: ${colorsBlack[1]}; color: ${colorsBlack[3]};`;
        preencherResultado.style = `background-color: ${colorsBlack[1]}; color: ${colorsBlack[3]}; display: block;`;
        userName.style = `color: ${colorsBlack[3]};`;
        joinGitHub.style = `color: #ccc;`;
        statusGitHub.style = `background-color: ${colorsBlack[2]};`;
        infosUserText.style = `color: #ccc;`;
        document.querySelectorAll('.status-github ul li p').forEach(item => item.style = `color: #ccc;`);
        document.querySelectorAll('.status-github ul li h4').forEach(item => item.style = `color: ${colorsBlack[3]};`);
        document.querySelectorAll('.menu-nav div a').forEach(item => item.style = `color: ${colorsBlack[3]};`);
        document.querySelectorAll('.menu-nav div p').forEach(item => item.style = `color: ${colorsBlack[3]};`);
        document.querySelector('section .infos-section .imagem-git').style = `background-color: rgba(173, 171, 171, 0.137);`;
    };
});