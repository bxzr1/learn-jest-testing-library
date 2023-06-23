import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import renderer from 'react-test-renderer'; // used for snapshot testing

jest.mock('axios');

const fakeUsers = [{
    "id": 1,
    "name": "Test User 1",
    "username": "testuser1",
   }, {
    "id": 2,
    "name": "Test User 2",
    "username": "testuser2",
   }];

describe('App component', () => {
    test('it renders', async () => {
        // after setting up jest.mock('axios'), need to add the .get.mockResolvedValue line to old tests too
        axios.get.mockResolvedValue({data: fakeUsers});
        render(<App />);
        // only fails if there’s a compilation error or an error in the function component that impedes its rendering
        // though valid, it is not a complete test because it does not perform any assertions
        expect(screen.getByText('Users:')).toBeInTheDocument();

        // expect(screen.getByTestId('user-list')).toBeInTheDocument();
        // user-list is only created and populated after the fetch but the test is running before it completes, so turn this into an async-await operation

        const userList = await waitFor(() => screen.getByTestId('user-list'));
        expect(userList).toBeInTheDocument();
    });

    test('it displays a row for each user', async () => {
        axios.get.mockResolvedValue({data: fakeUsers});
        render(<App/>);

        const userList = await waitFor(() => screen.findAllByTestId('user-item'));
        expect(userList).toHaveLength(2);
    });
})

describe('App component snapshot', () => {
    test('it renders a correct snapshot', async () => {
        axios.get.mockResolvedValue({data: fakeUsers});
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})