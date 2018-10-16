import { ListPuppers } from './index';
import React from 'react';
import renderer from 'react-test-renderer';

// beforeAll(() => {
//     const mockGeolocation = {
//         getCurrentPosition: jest.fn(),
//         watchPosition: jest.fn()
//     };

//     global.window.navigator.geolocation = mockGeolocation;
// })

describe('list', () => {
    it('renders a list of pets', () => {
        ListPuppers.fetchData = jest.fn();
        console.log(ListPuppers.fetchData)
        const component = renderer.create(
            <ListPuppers pets={[{ id: '1', name: 'nick', image: 'an iced tea' }]} />
        )
        // component.getInstance().fetchData = jest.fn();
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})