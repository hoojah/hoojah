require 'rails_helper'


describe 'HujahSerializer' do
  context 'when hujah has children hujah' do
    let(:hujah) { create(:hujah, :has_child)}
    it 'returns children hujah' do
      result =  JSON.parse(HujahSerializer.new(hujah).serialized_json)
      expect(result["data"]["attributes"]["children"].count).to eq(1)
    end
  end

  context 'when hujah has pareny hujah' do
    let(:hujah) { create(:hujah, :has_parent)}
    it 'returns children hujah' do
      result =  JSON.parse(HujahSerializer.new(hujah).serialized_json)
      expect(result["data"]["attributes"]["parent"].present?).to eq(true)
    end
  end
end