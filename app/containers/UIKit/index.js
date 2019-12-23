import React from 'react';
import {
	uiKitMessage,
	UiKitParserMessage
} from '@rocket.chat/ui-kit';

import Button from '../Button';

import { useBlockContext } from './utils';

import { Text } from './Text';
import { Divider } from './Divider';
import { Section } from './Section';
import { Actions } from './Actions';
import { MessageImage } from './Image';
import { StaticSelect } from './StaticSelect';
import { Context } from './Context';
import { MultiSelect } from './MultiSelect';

class MessageParser extends UiKitParserMessage {
	button = (element, context) => {
		const { text } = element;
		const [{ loading }, action] = useBlockContext(element, context);
		return (
			<Button
				title={this.text(text)}
				loading={loading}
				onPress={action}
				theme='light'
			/>
		);
	}

	divider = () => <Divider />;

	text = args => <Text {...args} />;

	section = args => <Section {...args} parser={this} />;

	actions = args => <Actions {...args} parser={this} />;

	datePicker = () => null;

	image = (element, context) => <MessageImage element={element} context={context} />;

	context = args => <Context {...args} parser={this} />;

	multiStaticSelect = (element, context) => {
		const [, action] = useBlockContext(element, context);
		return <MultiSelect {...element} onChange={action} />;
	}

	staticSelect = (element, context) => {
		const [, action] = useBlockContext(element, context);
		return <StaticSelect {...element} onChange={action} />;
	}

	selectInput = () => null;
}

export const messageParser = new MessageParser();

export const UiKitMessage = uiKitMessage(messageParser);