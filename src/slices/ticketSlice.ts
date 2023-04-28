import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from '../network/taskClient';

// Define a type for the slice state
interface TicketState {
	items: Ticket[];
	succeeded?: boolean | undefined;
	status: 'SameExist' | 'Added' | '';
}

// Define the initial state using that type
const initialState: TicketState = {
	items: [],
	status: '',
	succeeded: undefined,
};

export const ticketSlice = createSlice({
	name: 'ticket',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		add: (state: TicketState, action: PayloadAction<Ticket>) => {
			const sameTicketExist = state.items.find(
				(x) => x.id == action.payload.id
			);

			console.log('sameTicketExist', action.payload);

			if (sameTicketExist == undefined) {
				state.items.push(action.payload);
				state.status = 'Added';
				state.succeeded = true;

				return state;
			} else {
				state.status = 'SameExist';
				state.succeeded = false;

				return state;
			}
		},
	},
});

export const { add } = ticketSlice.actions;

export default ticketSlice.reducer;
