const fs = require('fs');
const inquirer = require('inquirer');
const team = require('./src/generateHtml');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');

const newTeam = [];

const newEmployee = () => {

    inquirer
        .prompt([

            {
                type: 'list',
                message: 'What type of team member are you adding?',
                choices: ['Manager', 'Engineer', 'Intern'],
                name: 'role',
            },
            {
                type: 'input',
                message: 'What is their name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is their employee ID number?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is their email?',
                name: 'email',
            },

        ])
        .then(function (response) {

            let { role, name, id, email } = response;

            if (role === 'Manager') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What is their office number?',
                            name: 'officeNumber'
                        },
                        {
                            type: 'list',
                            message: 'Would you like to add another team member?',
                            choices: ['Yes', 'No'],
                            name: 'school'
                        }

                    ])
                    .then(function (response) {
                        let { officeNumber, addMore } = response;

                        const newManager = new Manager(role, name, id, email, officeNumber);

                        newTeam.push(newManager);

                        if (addMore === 'Yes') {

                            teamBuilder();

                        };

                    });

            } else if (role === 'Engineer') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What is their GitHub username?',
                            name: 'github'
                        }

                    ])
                    .then(function (response) {
                        let { github } = response;
                    });

            } else if (role === 'Intern') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What school are they attending or most recently attended?',
                            name: 'school'
                        }

                    ])
                    .then(function (response) {
                        let { school } = response;
                    });

            }

        });

};

const generateHtml = () => {

    console.log('New Team:' + newTeam);

    const generatedHtml = team(newTeam);

    console.log('HTML:' + generatedHtml);

    fs.writeFile('dist/team.html', generatedHtml, function (error) {
        if (error) { console.error(error) };
    });

};

// create file
const teamBuilder = () => {

    inquirer
        .prompt([

            {
                type: 'list',
                message: 'What type of team member are you adding?',
                choices: ['Manager', 'Engineer', 'Intern'],
                name: 'role',
            },
            {
                type: 'input',
                message: 'What is their name?',
                name: 'name',
            },
            {
                type: 'input',
                message: 'What is their employee ID number?',
                name: 'id',
            },
            {
                type: 'input',
                message: 'What is their email?',
                name: 'email',
            },

        ])
        .then(function (response) {

            let { role, name, id, email } = response;

            if (role === 'Manager') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What is their office number?',
                            name: 'officeNumber'
                        },
                        {
                            type: 'list',
                            message: 'Would you like to add another team member?',
                            choices: ['Yes', 'No'],
                            name: 'school'
                        }

                    ])
                    .then(function (response) {
                        let { officeNumber, addMore } = response;

                        const newManager = new Manager(role, name, id, email, officeNumber);

                        newTeam.push(newManager);

                        if (addMore === 'Yes') {

                            teamBuilder();

                        } else {

                            generateHtml();

                        }

                    });

            } else if (role === 'Engineer') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What is their GitHub username?',
                            name: 'github'
                        }

                    ])
                    .then(function (response) {
                        let { github } = response;
                    });

            } else if (role === 'Intern') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What school are they attending or most recently attended?',
                            name: 'school'
                        }

                    ])
                    .then(function (response) {
                        let { school } = response;
                    });

            }

        });

};

teamBuilder();