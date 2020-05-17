require 'rails_helper'

RSpec.describe Hujah, type: :model do

  describe '#current_user_vote' do
    let!(:user) { create(:user) }
    let!(:hujah) { create(:hujah)}
    context 'if logged in without voting' do
      it 'will return nil' do
        result = hujah.current_user_vote(logged_in: true, current_user_id: user.id)
        expect(result).to eq(nil)
      end
    end

    context 'if logged in and has voted' do
      let!(:vote) { create(:vote, :agree, user: user, hujah: hujah)}
      it 'will return vote value' do
        result = hujah.current_user_vote(logged_in: true, current_user_id: user.id)
        expect(result).to eq("agree")
      end
    end

    context 'if not logged in' do
      it 'will return nil' do
        result = hujah.current_user_vote(logged_in: false, current_user_id: nil)
        expect(result).to eq(nil)
      end
    end
  end
end
