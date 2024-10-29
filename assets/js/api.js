

async function fetchProfileData(){
    const url = 'https://raw.githubusercontent.com/lumens7/SitePessoal/refs/heads/main/profile.json'
    const fetching = await fetch(url)
    return await fetching.json()
}