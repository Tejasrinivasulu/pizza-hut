import { UserIcon } from "@/icons/UserIcon";
import { Input } from "@nextui-org/react";
const NameInput = ({ nameValue, setName, disabled, className }) => {
    return (<Input isRequired label="Name" labelPlacement='outside' placeholder="Enter your full name" type="text" size='lg' className={className} classNames={{ label: "pl-3" }} value={nameValue} onChange={e => setName(e.target.value)} isDisabled={disabled} endContent={<UserIcon className="w-6 place-self-center"/>}/>);
};
export default NameInput;
