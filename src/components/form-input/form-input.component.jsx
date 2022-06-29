import { FormInputLabel, Group, Input} from './form-input.styles';

const FormInput = ({label, ...otherProps}) => {
    return (
        <Group>
            <Input {...otherProps}/>
            {/* if lable exist then render this label */}
            {label && (
                <FormInputLabel 
                    shrink={otherProps.value.length}
                >
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput;