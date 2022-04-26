const fs = require('fs');
const inquirer = require('inquirer');
const team = require('./src/generateHtml');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const newTeam = [];

const generateHtml = () => {

    const generatedHtml = team(newTeam);

    newTeam.join("");

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
                            name: 'addMore'
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

                        };

                    });

            } else if (role === 'Engineer') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What is their GitHub username?',
                            name: 'github'
                        },
                        {
                            type: 'list',
                            message: 'Would you like to add another team member?',
                            choices: ['Yes', 'No'],
                            name: 'addMore'
                        }

                    ])
                    .then(function (response) {
                        let { github, addMore } = response;

                        const newEngineer = new Engineer(role, name, id, email, github);

                        newTeam.push(newEngineer);

                        if (addMore === 'Yes') {

                            teamBuilder();

                        } else {

                            generateHtml();

                        };

                    });

            } else if (role === 'Intern') {

                inquirer
                    .prompt([

                        {
                            type: 'input',
                            message: 'What school are they attending or most recently attended?',
                            name: 'school'
                        },
                        {
                            type: 'list',
                            message: 'Would you like to add another team member?',
                            choices: ['Yes', 'No'],
                            name: 'addMore'
                        }

                    ])
                    .then(function (response) {
                        let { school, addMore } = response;

                        const newIntern = new Intern(role, name, id, email, school);

                        newTeam.push(newIntern);

                        if (addMore === 'Yes') {

                            teamBuilder();

                        } else {

                            generateHtml();

                        };

                    });

            }

        });

};

teamBuilder();