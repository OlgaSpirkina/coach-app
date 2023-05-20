export async function fetchCompaniesList() {
    const response = await fetch('/companies');
    const data = await response.json();
    return data.companies;
}
export async function fetchSitesList() {
    const response = await fetch('/companies/sites');
    const data = await response.json();
    return data.sites;
}