
import userEvent from "@testing-library/user-event"
import {ProfileStatus} from "./ProfileStatus"
import { render, screen, act } from "@testing-library/react"


    
// Объединяем ряд тестов в группу
describe('ProfileStatus Component', () => {
    it('Status from props should be in the state', async () => {
        // render(<ProfileStatus getStatus={() =>{}} status="My Status" />)
        // expect(await screen.findByText(/my status/i)).toBeInTheDocument()
    })

    it('when the p with the status is dblclicked it disappears and the input with the status appears',async () => {
        // render(<ProfileStatus getStatus={() =>{}} status="My status"/>)
        // const pWithStatus = await screen.findByText(/my status/i)
        // await act(() => userEvent.dblClick(pWithStatus))  
        // expect(screen.queryByText(/my status/i)).toBeNull()
    })

    // it('when the user types text in the input and then focus other elem, typed text appeares in the p as an user status', async () => {
    //     const getStatus = () => {
    //         try {
    //             const resp = await profileAPI.updateStatus(status);
        
    //             if (resp.user.resultCode === 1) {
    //                 dispatch(setStatus(status));
    //                 dispatch(setProfileStatus(status));
    //             }
    //         } catch (error) {}
    //     }

    //     render(<ProfileStatus status="My status"/>)
    //     const pWithStatus = await screen.findByText(/my status/i)
    //     await act(() => userEvent.dblClick(pWithStatus))
    //     await act(() => {
    //         const inputElem = screen.getByDisplayValue(/my status/i)
    //         userEvent.type(inputElem, 'this is my status')
    //         inputElem.blur()
    //     })

    //     expect(screen.getByText(/this is my status/i)).toBeInTheDocument()
    // })
})
