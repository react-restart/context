import { configure } from 'enzyme';
import Adapter from '@monastic.panic/enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
