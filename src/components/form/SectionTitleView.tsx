import Section from '../../models/section';
import Panel, { PanelBody, PanelCap } from '../common/Panel';
import Input from '../common/Input';

interface Props {
  section: Section;
}

const SectionTitleView = ({ section }: Props) => {
  return (
    <div>
      <PanelCap />
      <Panel>
        <PanelBody className='flex flex-col'>
          <h4 className='mb-17 text-24 text-gray900 font-semibold'>
            {section.title}
          </h4>
          <p className='text-16 text-gray700'>{section.description}</p>
          <Input
            className='mb-17 text-24 text-gray500 font-semibold py-8'
            value={section.title}
            onChange={(e) => section.setTitle(e.currentTarget.value)}
          />
          <Input
            className='text-16 text-gray700 py-3'
            value={section.description}
            onChange={(e) => section.setDescription(e.currentTarget.value)}
          />
        </PanelBody>
      </Panel>
    </div>
  );
};

export default SectionTitleView;
