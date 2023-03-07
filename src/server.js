function calculateAgeOfUser(user) {
    return new Date().getFullYear() - user.birthYear;
}
calculateAgeOfUser({
    birthYear: 1994
});
