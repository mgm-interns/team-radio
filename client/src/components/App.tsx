import * as React from 'react';
import { Md3dRotation } from 'react-icons/md';
import Button from '@material-ui/core/Button';

export function Greeting({ message }: App.IApp) {
	return (
		<div>
			<h1>Hello {message} <Md3dRotation/></h1>
			<Button variant="contained">
				Example button
			</Button>
		</div>
	);
}

namespace App {
	export interface IApp {
		message: string;
	}
}
