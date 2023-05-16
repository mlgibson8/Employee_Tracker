const viewAllEmployees = () => {
    db.query(`
    SELECT * FROM employee
    `, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}